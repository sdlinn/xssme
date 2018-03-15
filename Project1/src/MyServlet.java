

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/MyServlet")
public class MyServlet extends HttpServlet {
	private static final long		serialVersionUID	= 1L;
	static String			url		= "jdbc:mysql://ec2-34-208-198-108.us-west-2.compute.amazonaws.com:3306/myDB2";
	static String			user		= "newremoteuser";
	static String			password		= "password";
	static Connection			connection	= null;

	public MyServlet() {
		super();
		try {
			connection = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			System.out.println("Connection Failed! Check output console");
			e.printStackTrace();
			return;
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().println("-------- MySQL JDBC Connection Testing ------------<br>");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Where is your MySQL JDBC Driver?");
			e.printStackTrace();
			return;
		}
		response.getWriter().println("MySQL JDBC Driver Registered!<br>");
		
		try {
			
			String selectSQL = "SELECT * FROM myTable3 WHERE Name_of_Book LIKE ?";
			String Name_of_Book = request.getParameter("bookName");
			if (Name_of_Book == null) 
			{
				Name_of_Book = "%";
			}
			
			response.getWriter().println(selectSQL + "<br>");
			response.getWriter().println("------------------------------------------<br>");
			PreparedStatement preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, Name_of_Book);
			ResultSet rs = preparedStatement.executeQuery();
			if (!rs.isBeforeFirst()){
				response.getWriter().append("No books found with title ").append(Name_of_Book);
			}
			write(response, "<table>");
			write(response, "<tr>");
			write(response, 
					"<th>Id</th><th> Author </th><th> Book </th><th> Status </th>"+
					"<th> Checked-out By </th><th> Checkout Date </th><th> Return Date </th><th> Link to Book </th>"
			);
			write(response, "</tr>");
			while (rs.next()) {
				write(response,"<tr>");
				String id = rs.getString("ID");
				String Author = rs.getString("Author");
				Name_of_Book = rs.getString("Name_of_Book");
				String Status_of_Book = rs.getString("Status_of_Book");
				String Checked_out_by = rs.getString("Checked_out_by");
				String Date_of_Check_out = rs.getString("Date_of_Check_out");
				String Date_of_Return_of_Book = rs.getString("Date_of_Return_of_Book");
				String Link_to_Book = rs.getString("Link_to_Book");
				
				write(response, "<td>" + id + "</td>");
				write(response, "<td>" + Author + "</td>");
				write(response, "<td>" + Name_of_Book + "</td>");
				write(response, "<td>" + Status_of_Book + "</td>");
				write(response, "<td>" + Checked_out_by + "</td>");
				write(response, "<td>" + Date_of_Check_out + "</td>");
				write(response, "<td>" + Date_of_Return_of_Book + "</td>");
				//write(response, "<td>" + Link_to_Book + "</td>");
				response.setContentType("text/html");
				response.getWriter().println("<td><a href = \"" + Link_to_Book + "\">Download</a></td>");
				write(response, "</tr>");
			}
			write(response,"</table>");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	private void write(HttpServletResponse r, String message) throws IOException{
		r.getWriter().append(message);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//write(response, "got in add action" + request.getParameter("action"));
		//	response.encodeRedirectURL("http://ec2-34-217-41-127.us-west-2.compute.amazonaws.com:8080/Project1/MyServlet");
			String Author = request.getParameter("Author");
			String Name_of_Book = request.getParameter("Name_of_Book");
			String Status_of_Book = request.getParameter("Status_of_Book");
			String Checked_out_by = request.getParameter("Checked_out_by");
			String Date_of_Check_out = request.getParameter("Date_of_Check_out");
			String Date_of_Return_of_Book = request.getParameter("Date_of_Return_of_Book");
			String Link_to_Book = request.getParameter("Link_to_Book");
			
			if (request.getParameter("action").equals("add")){
				PreparedStatement preparedStatement = connection.prepareStatement(
					"INSERT INTO myTable3 SET "+
					"Author = ?, Name_of_Book = ?, Status_of_book=?, Checked_out_by=?,Date_of_Check_out=?,Date_of_Return_of_Book=?,Link_to_Book=?"
				);
				preparedStatement.setString(1,Author);
				preparedStatement.setString(2,Name_of_Book);
				preparedStatement.setString(3,Status_of_Book);
				preparedStatement.setString(4,Checked_out_by);
				preparedStatement.setString(5,Date_of_Check_out);
				preparedStatement.setString(6,Date_of_Return_of_Book);
				preparedStatement.setString(7,Link_to_Book);
				int id = preparedStatement.executeUpdate();
				//Name_of_Book = "%";
				
				/*response.getWriter().append("ID: " + id + ", ");
				response.getWriter().append("Author: " + Author + ", ");
				response.getWriter().append("Name_of_Book " + Name_of_Book + ", ");
				response.getWriter().append("Status_of_Book " + Status_of_Book + ", ");
				response.getWriter().append("Checked_out_by " + Checked_out_by + ", ");
				response.getWriter().append("Date_of_Check_out " + Date_of_Check_out + ", ");
				response.getWriter().append("Date_of_Return_of_Book " + Date_of_Return_of_Book + ", ");
//				response.getWriter().append("Link_to_Book " + Link_to_Book + "<br>");
				response.setContentType("text/html");
				response.getWriter().println("<a href = \"" + Link_to_Book + "\">Link</a>");*/
			
				
			} else if (request.getParameter("action").equals("delete")) {
				write(response, "got in delete action");
				PreparedStatement preparedStatement = connection.prepareStatement(
						"DELETE FROM myTable3 WHERE Name_of_Book like ?"
						
				);
				preparedStatement.setString(1, Name_of_Book);
				write(response, "result: " + preparedStatement.executeUpdate());
				//Name_of_Book = "%";	
			}
		}
		catch (Exception e){
			throw new ServletException(e);
		}
}
}




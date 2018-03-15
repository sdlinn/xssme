package webprojectLib;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

public class dbconnection {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			Class.forName ("com.mysql.jdbc.Driver");
			System.out.println("Driver found");
		} catch (ClassNotFoundException e) {
			System.out.println("Driver not found" +e);
		}
		
		String url = "jdbc:mysql://ec2-34-217-41-127.us-west-2.compute.amazonaws.com:3306/myDB2";
		String user = "newremoteuser";
		String password = "password";
		
		Connection con = null;
		
		//import database
		try {
			con = (Connection) DriverManager.getConnection(url, user, password);
			System.out.println("Connected Successfully!");
		} catch (SQLException e) {
			System.out.println("Something went wrong in database connection"+e);
		}
	}

}
;
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
	integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
	crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
	integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
	crossorigin="anonymous"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
	integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
	crossorigin="anonymous"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
	integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
	crossorigin="anonymous"></script>
<style type="text/css"></style>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Cloud Security Project</title>
</head>
<!-- style="background-color:powderblue;" -->
<body
	background="https://image.freepik.com/free-photo/white-textured-wall-background-texture_1368-6402.jpg">
	<div class="col-lg-6">
		<h1>Welcome To The Library!</h1>
	</div>
	<hr />
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<legend>Book Details:</legend>
			</div>
			<!-- panel preview -->
			<div class="col-sm-8">
				<div class="panel panel-default">
					<form action="MyServlet" method="POST">
					<input type="hidden" name="action" value="add" />
						<div class="panel-body form-horizontal payment-form">
							<div class="form-group">
								<label for="concept" class="col-sm-3 control-label">Name
									of Book</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="concept"
										name="Name_of_Book">
								</div>
							</div>
							<div class="form-group">
								<label for="description" class="col-sm-3 control-label">Author</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="description"
										name="Author">
								</div>
							</div>
							<div class="form-group">
								<label for="status" class="col-sm-3 control-label">Status
									of Book</label>
								<div class="col-sm-9">
									<select class="form-control" id="status" name="Status_of_Book">
										<option selected="selected">Select</option>
										<option>Available</option>
										<option>Checked Out</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="concept" class="col-sm-3 control-label">Checked
									Out By</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="concept"
										name="Checked_out_by">
								</div>
							</div>
							<div class="form-group">
								<label for="date" class="col-sm-3 control-label">Check
									Out Date</label>
								<div class="col-sm-9">
									<input type="date" class="form-control" id="date"
										name="Date_of_Check_out">
								</div>
							</div>
							<div class="form-group">
								<label for="date" class="col-sm-3 control-label">Return
									Date</label>
								<div class="col-sm-9">
									<input type="date" class="form-control" id="date"
										name="Date_of_Return_of_Book">
								</div>
							</div>
							<div class="form-group">
								<label for="description" class="col-sm-3 control-label">Book
									Link</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="description"
										name="Link_to_Book">
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-12 text-left">
									<button type="submit"
										class="btn btn-primary preview-add-button">
										<span class="glyphicon glyphicon-plus"></span> Add
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
				
			</div>
			<!-- / panel preview -->
			<div class="col-sm-4">
				<div class="panel panel-default">
					<form action="MyServlet" method="GET">
						
						<div class="panel-body form-horizontal payment-form">
							<div class="form-group">
								<label for="concept" class="col-xs-3 control-label"><strong>Search
										Book</strong></label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="concept"
										name="bookName">
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-12 text-left">
									<input type="submit" class="btn btn-primary preview-add-button"
										value="Search">
								</div>
							</div>
							</form>
							<form action="MyServlet" method="POST">
							<input type="hidden" name="action" value="delete" />
							<div class="form-group">
								<label for="concept" class="col-xs-3 control-label"><strong>Delete
										Book</strong></label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="concept"
										name="Name_of_Book">
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-12 text-left">
									<input type="submit" class="btn btn-primary preview-add-button"
										value="Delete">
								</div>
							</div>
						</form>
						</div>
				</div>
			</div>
		</div>
</body>
</html>
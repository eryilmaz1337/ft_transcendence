function profileAdd() {
    return `
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Sensoyyasin | Profile Template</title>
		<link rel="stylesheet" href="style.css">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet">
		<style>

			.profile-body {
				margin-top: 20px;
			}

			.ui-w-80 {
				width: 80px !important;
				height: auto;
			}

			.btn-default {
				border-color: rgba(24, 28, 33, 0.1);
				color: #4E5155;
			}

			label.btn {
				margin-bottom: 0;
			}

			.btn-outline-primary {
				border-color: #26B4FF;
				background: transparent;
				color: #26B4FF;
			}

			.btn {
				cursor: pointer;
			}

			.text-light {
				color: #babbbc !important;
			}

			.card {
				background-clip: padding-box;
				box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
			}

			.row-bordered {
				overflow: hidden;
			}

			.account-settings-fileinput {
				position: absolute;
				visibility: hidden;
				width: 1px;
				height: 1px;
				opacity: 0;
			}

		</style>
	</head>

	<body class="profile-body">
		<div class="container light-style flex-grow-1 container-p-y">
			<h4 class="font-weight-bold py-3 mb-4" style="color: #26B4FF;">
				Account Settings
			</h4>
			<div class="card overflow-hidden">
				<div class="row no-gutters row-bordered row-border-light">
					<div class="col-md-9">
						<div class="tab-content">
							<div class="tab-pane fade active show" id="Profile">
								<div class="card-body media align-items-center">
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt
										class="d-block ui-w-80">
									<div class="media-body ml-4">
										<label class="btn btn-outline-primary">
											Upload new photo
											<input type="file" class="account-settings-fileinput">
										</label> &nbsp;
										<button type="button" class="btn btn-default md-btn-flat">Reset</button>
										<div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K
										</div>
									</div>
								</div>
								<hr class="border-light m-0">
								<div class="card-body">
									<div class="form-group">
										<label class="form-label">Username</label>
										<input type="text" class="form-control mb-1" value="sensoyyasin">
									</div>
									<div class="form-group">
										<label class="form-label">Name</label>
										<input type="text" class="form-control" value="Nelle Maxwell">
									</div>
									<div class="form-group">
										<label class="form-label">E-mail</label>
										<input type="text" class="form-control mb-1" value="sensoyyasin@mail.com">
										<div class="alert alert-warning mt-3">
										<input type="checkbox" id="confirm" name="confirm" checked>
										<label for="confirm">iki faktörlü doğrulama etkinleştir</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="text-right mt-3">
				<button type="button" class="btn btn-primary">Save changes</button>&nbsp;
				<button type="button" class="btn btn-default">Cancel</button>
			</div>
		</div>
	</body>
	</html>
`;
}

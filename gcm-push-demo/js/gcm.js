function sendNotification() {
	$("#loader").show();
	var token = $("#client-token").val();
	var serverKey = $("#server-key").val();
	var host = $("#endpoint").val();
	var pars = {
		"to" : token
	}

	var request = $.ajax({
		url: host, 
		type: 'post',
		data: JSON.stringify(pars),
		headers: {
			"Authorization": "key=" + serverKey, 
			"Content-Type": "application/json"
		},
		dataType: 'json' 
	});

	request.done(function(data){
		$("#loader").hide();
		console.log("response: ", data);
		if(data.success == 1) {
			$("#gcm-success-msg").html("Notification sent.");
			$("#gcm-success").show();
		} else {
			$("#gcm-success-msg").html("Client token wrong.");
			$("#gcm-success-msg").show();
		}
	})

	request.fail(function(err) {
		console.log('error: ' , err);
		$("#loader").hide();
		$("#gcm-error-msg").html(err.responseText);
		$("#gcm-success").show();
	});
}

function clearMessages() {
	$("#gcm-success").hide();
	$("#gcm-error").hide();
}
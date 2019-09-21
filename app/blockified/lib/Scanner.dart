import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'package:qr_utils/qr_utils.dart';

import 'Meta.dart';

class Scanner extends StatefulWidget {
  dynamic me;
  dynamic event;
  Scanner(this.event,this.me);

  @override
  _ScanState createState() => new _ScanState();
}

class _ScanState extends State<Scanner> {
  String code = "";

  @override
  initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: new Center(
          child: new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              RaisedButton(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                color: Colors.deepPurple,
                textColor: Colors.white,
                splashColor: Colors.blueGrey,
                onPressed: scan,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 24.0),
                  child: const Text('START CAMERA SCAN'),
                ),
              )
              ,
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Text(code, textAlign: TextAlign.center,),
              )
              ,
            ],
          ),
        ));
  }

  Future scan() async {
    final content = await QrUtils.scanQR;
    setState(() {
      code = content;
    });
    _makeEventVerifyRequest(content);
  }

  _makeEventVerifyRequest(String userId) async {
    // set up POST request arguments
    String url = Meta.host+'verifyEvent';
    Map<String, String> headers = {"Content-type": "application/json"};
    String jsn = '{"userId": "'+userId+'", "eventId": "'+widget.event['Key']+'"}';
    // make POST request
    Response response = await post(url, headers: headers, body: jsn);
    // check the status code for the result
    int statusCode = response.statusCode;
    // this API passes back the id of the new item added to the body
    var body = json.decode(response.body);
    print(body);
    _showDialog();
  }

  void _showDialog() {
    // flutter defined function
    showDialog(
      context: context,
      builder: (BuildContext context) {
        // return object of type Dialog
        return AlertDialog(
          title: new Text("Verified"),
          content: new Text("User Verified For This Event"),
          actions: <Widget>[
            // usually buttons at the bottom of the dialog
            new FlatButton(
              child: new Text("Close"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
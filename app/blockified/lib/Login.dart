import 'dart:convert';

import 'package:blockified/HomePage.dart';
import 'package:blockified/Meta.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {

  TextEditingController userId;
  TextEditingController password;


  @override
  void initState() {
    super.initState();
    userId = TextEditingController();
    password = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    EdgeInsets devicePadding = MediaQuery.of(context).padding;
    return Scaffold(
      backgroundColor: Color.fromRGBO(93, 142, 155, 1.0),
      body: Container(
          child: Stack(
            children: <Widget>[
              Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      // Box decoration takes a gradient
                      gradient: LinearGradient(
                        // Where the linear gradient begins and ends
                        begin: Alignment.topRight,
                        end: Alignment.bottomLeft,
                        // Add one stop for each color. Stops should increase from 0 to 1
                        stops: [0.0, 1.0],
                        colors: [
                          Color.fromRGBO(170, 207, 211, 1.0),
                          Color.fromRGBO(93, 142, 155, 1.0),
                        ],
                      ),
                    ),
                  )),
              Positioned.fill(
                child: SingleChildScrollView(
                    padding: EdgeInsets.only(
                        left: 20.0, right: 20.0, top: 300 + 50.0),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                          Container(
                              decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius:
                                  BorderRadius.all(Radius.circular(25.0))),
                              child: Padding(
                                padding: const EdgeInsets.all(30.0),
                                child: Form(
                                    child: Column(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      crossAxisAlignment: CrossAxisAlignment.center,
                                      children: <Widget>[
                                        TextFormField(
                                          controller: userId,
                                          keyboardType: TextInputType.emailAddress,
                                          decoration: InputDecoration(
                                            hintText: "What's your User ID?",
                                            labelText: "User ID",
                                          )
                                        ),
                                        TextFormField(
                                          controller: password,
                                          keyboardType: TextInputType.emailAddress,
                                          decoration: InputDecoration(
                                            labelText: "Password",
                                            hintText: "Enter Your PASSWORD",
                                          ),
                                          obscureText: true,
                                        ),
                                        SizedBox(height: 40,),
                                        Container(
                                          width: double.infinity,
                                          height: 50.0,
                                          decoration: BoxDecoration(
                                              borderRadius: BorderRadius.circular(25.0),
                                              gradient: LinearGradient(
                                                colors: <Color>[
                                                  Color.fromRGBO(160, 92, 147, 1.0),
                                                  Color.fromRGBO(115, 82, 135, 1.0)
                                                ],
                                              )),
                                          child: Material(
                                            color: Colors.transparent,
                                            child: InkWell(
                                                onTap: _makeLoginRequest,
                                                child: Center(
                                                  child: Text("Sign In",
                                                      style: TextStyle(
                                                          fontFamily: "RobotoMedium",
                                                          fontSize: 16,
                                                          color: Colors.white)),
                                                )),
                                          ),
                                        ),
                                      ],
                                    )),
                              )),
                        ])),
              ),
            ],
          )),
    );
  }

  _makeLoginRequest() async {
    // set up POST request arguments
    String url = Meta.host+'login';
    Map<String, String> headers = {"Content-type": "application/json"};
    String jsn = '{"userId": "'+userId.text+'", "password": "'+password.text+'"}';
    // make POST request
    Response response = await post(url, headers: headers, body: jsn);
    // check the status code for the result
    int statusCode = response.statusCode;
    // this API passes back the id of the new item added to the body
    var body = json.decode(response.body);
    print(body);
    if(body['verified'] == 'yes'){
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context){
            return HomePage(body);
          }
        ));
    }
  }

}

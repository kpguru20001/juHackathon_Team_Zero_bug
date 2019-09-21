import 'package:blockified/Login.dart';
import 'package:flutter/material.dart';

void main() => runApp(RoutingPage());

class RoutingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Login(),);
  }
}



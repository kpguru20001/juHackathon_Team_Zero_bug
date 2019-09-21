import 'dart:collection';

import 'package:blockified/Events.dart';
import 'package:blockified/NavigatorItem.dart';
import 'package:blockified/NavigatorTile.dart';
import 'package:blockified/Profile.dart';
import 'package:blockified/QRCode.dart';
import 'package:blockified/Scanner.dart';
import 'package:blockified/UserModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'Backdrop.dart';
import 'Users.dart';


class HomePage extends StatefulWidget {
  LinkedHashMap data;
  HomePage(this.data){
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark.copyWith(
      statusBarColor: Colors.transparent,
      statusBarBrightness:
      Brightness.light, //or set color with: Color(0xFF0000FF)
    ));
  }

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {


  NavigatorItem _currentNavigator;
  Widget _onScreen;
  QRCode _qrCode;
  Profile _profile;
  Users _users;
  Events _events;
  List<NavigatorItem> _navigators = <NavigatorItem>[];


  @override
  void initState() {
    super.initState();
    _qrCode = QRCode(widget.data['me']['Key']);
    _events = Events(widget.data['events'],widget.data['me']);
    _profile = Profile(widget.data['me']['Record']['name'],['abs','cda','sdf']);
    _users = Users(widget.data['employees']);
    _navigators.add(NavigatorItem(
        name: 'PROFILE', color: Colors.orange, icon: Icons.account_circle));
    _navigators.add(
        NavigatorItem(name: 'QR CODE', color: Colors.cyan, icon: Icons.crop_square));
    _navigators.add(NavigatorItem(
        name: 'USERS', color: Colors.green, icon: Icons.supervisor_account));
    _navigators.add(NavigatorItem(
        name: 'EVENTS', color: Colors.red, icon: Icons.event));
    _currentNavigator = _navigators[0];
    _onScreen = _profile;
  }

  void _onNavigatorTap(NavigatorItem item, BuildContext ctx) {
    if (item.name == 'QR CODE') {
      setState(() {
        _onScreen = _qrCode;
        _currentNavigator = item;
      });
    }
     else if (item.name == 'USERS') {
      setState(() {
        _onScreen = _users;
        _currentNavigator = item;
      });
    } else if (item.name == 'PROFILE') {
      setState(() {
        _onScreen = _profile;
        _currentNavigator = item;
      });
    } else if (item.name == 'EVENTS') {
      setState(() {
        _onScreen = _events;
        _currentNavigator = item;
      });
    }else
      setState(() {
        _currentNavigator = item;
      });
  }


  Widget _buildNavigatorTiles() {
    return ListView.builder(
      physics: BouncingScrollPhysics(),
      itemBuilder: (BuildContext context, int index) {
        var _navigator = _navigators[index];
        return NavigatorTile(
          navigator: _navigator,
          onTap: _onNavigatorTap,
        );
      },
      itemCount: _navigators.length,
    );
  }

  @override
  Widget build(BuildContext context) {
    final navigatorList = Padding(
        padding: EdgeInsets.only(
          left: 8.0,
          right: 8.0,
          bottom: 24.0,
        ),
        child: _buildNavigatorTiles());
    return Scaffold(
      body: Backdrop(
        currentNavigator: _currentNavigator,
        frontPanel: _onScreen,
        backPanel: navigatorList,
        frontTitle: Text('Blockified'),
        backTitle: Text('Navigate'),
      ),
    );
  }
}



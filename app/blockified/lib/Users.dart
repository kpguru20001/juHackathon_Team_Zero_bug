import 'package:flutter/material.dart';

import 'Profile.dart';
import 'UserModel.dart';

class Users extends StatefulWidget {
  List<dynamic> users;

  Users(this.users);

  @override
  _UsersState createState() => _UsersState();
}

class _UsersState extends State<Users> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: widget.users.length,
        physics: BouncingScrollPhysics(),
        itemBuilder: (context, index) {
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListTile(
          leading: CircleAvatar(
            radius: 40,
            backgroundColor: Colors.green,
            child: Text(widget.users[index]['Record']['name'][0].toUpperCase(),style: TextStyle(fontSize: 24,color: Colors.white),),
          ),
          title: Text(widget.users[index]['Record']['name'],style: TextStyle(fontSize: 24),),
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (ctx) {
              return Profile(widget.users[index]['Record']['name'], ['abc', 'ghj']);
            }));
          },
        ),
      );
    });
  }
}

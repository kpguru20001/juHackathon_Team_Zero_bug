import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  String name;
  List<String> exps;

  Profile(this.name, this.exps);

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          SizedBox(
            height: 60,
          ),
          CircleAvatar(
            //backgroundImage: CachedNetworkImageProvider(
            //  'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_images/2017-06/screen_shot_2017-06-16_at_8.12.22_am.png?itok=DpMDAm4C'),
            child: Text(
              widget.name[0].toUpperCase(),
              style: TextStyle(fontSize: 50, color: Colors.white),
            ),
            backgroundColor: Colors.blueGrey,
            maxRadius: 80.0,
            minRadius: 60.0,
          ),
          SizedBox(
            height: 40,
          ),
          Center(
              child: Text(
            widget.name,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          )),
          SizedBox(
            height: 40,
          ),
          Text('Expertise',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),),
          SizedBox(height: 20,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              Chip(
                label: Text('Block Chain',style: TextStyle(color: Colors.white,fontSize: 20),),
                backgroundColor: Colors.deepOrange,
              ),
              Chip(
                label: Text('Node.JS',style: TextStyle(color: Colors.white,fontSize: 20),),
                backgroundColor: Colors.deepOrange,
              ),
              Chip(
                label: Text('Vue.JS',style: TextStyle(color: Colors.white,fontSize: 20),),
                backgroundColor: Colors.deepOrange,
              )
            ],
          )
        ],
      ),
    );
  }
}

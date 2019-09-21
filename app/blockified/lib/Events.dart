import 'package:blockified/Scanner.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class Events extends StatefulWidget {

  List<dynamic> events;
  dynamic me;

  Events(this.events,this.me);

  @override
  _EventsState createState() => _EventsState();
}

class _EventsState extends State<Events> {
  @override
  Widget build(BuildContext context) {
    return StaggeredGridView.countBuilder(
      physics: BouncingScrollPhysics(),
      crossAxisCount: 2,
      itemCount: widget.events.length,
      staggeredTileBuilder: (int index) => StaggeredTile.fit(1),
      itemBuilder: (BuildContext ctxt, int index) {
        return Stack(
          fit: StackFit.passthrough,
          children: <Widget>[
            InkWell(
              customBorder: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0)),
              splashColor: Colors.red,
              onTap: () {
                Navigator.of(ctxt)
                    .push(MaterialPageRoute(builder: (BuildContext context) {
                  return Scanner(widget.events[index],widget.me);
                }));
              },
              child: Padding(
                padding: const EdgeInsets.all(2.0),
                child: Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0)),
                  elevation: 8.0,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      ClipRRect(
                        borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(8.0),
                            topRight: Radius.circular(8.0)),
                        child: Text(
                          widget.events[index]['Record']['eventName'][0].toUpperCase(),
                          style: TextStyle(fontSize: 80, color: Colors.red),
                        ),
                      ),
                      SizedBox(height: 10.0),
                      Text(
                        widget.events[index]['Record']['eventName'],
                        style: TextStyle(
                            fontFamily: "MontserratBold", fontSize: 20.0),
                      ),
                      SizedBox(
                        height: 10.0,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

import 'NavigatorItem.dart';

const _rowHeight = 80.0;
final _borderRadius = BorderRadius.circular(_rowHeight / 2);

class NavigatorTile extends StatelessWidget {
  final NavigatorItem navigator;
  final void Function(NavigatorItem, BuildContext) onTap;
  final Widget child;

  const NavigatorTile(
      {Key key, @required this.navigator, this.onTap, this.child})
      : assert(navigator != null),
        super(key: key);

  /*@override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      heroTag: null,
      onPressed: () {
        this.onTap(this.navigator, context);
      },
      backgroundColor: Colors.lightBlueAccent,
      child: this.child,
    );
  }*/

  @override
  Widget build(BuildContext context) {
    return Material(
      color:
      onTap == null ? Color.fromRGBO(50, 50, 50, 0.2) : Colors.transparent,
      child: Container(
        height: _rowHeight,
        child: InkWell(
          borderRadius: _borderRadius,
          highlightColor: navigator.color[100],
          splashColor: navigator.color[900],
          onTap: onTap == null ? null : () => onTap(navigator, context),
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Icon(
                    navigator.icon,
                    color: Colors.white,
                  ),
                ),
                Center(
                  child: Text(
                    navigator.name,
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

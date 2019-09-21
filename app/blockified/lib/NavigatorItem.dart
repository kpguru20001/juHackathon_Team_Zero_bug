import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

class NavigatorItem {
  final String name;
  final ColorSwatch color;
  final IconData icon;

  const NavigatorItem({
    @required this.name,
    @required this.color,
    @required this.icon,
  })  : assert(name != null),
        assert(color != null),
        assert(icon != null);
}

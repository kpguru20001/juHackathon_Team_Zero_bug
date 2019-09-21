import 'package:flutter/material.dart';
import 'package:qr_utils/qr_utils.dart';

class QRCode extends StatefulWidget {
  String id;

  QRCode(this.id);

  @override
  State<StatefulWidget> createState() => QRCodeState();
}

class QRCodeState extends State<QRCode> {
  Image image;

  @override
  void initState() {
    super.initState();
    generateQRImage();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Your ID',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20,),
            image == null ? Container() : image
          ],
        ),
      ),
    );
  }

  void generateQRImage() async {
    print('IDDDDDDDDDDDD :  ${widget.id}');
    var img = await QrUtils.generateQR(widget.id);
    setState(() {
      image = img;
    });
  }
}

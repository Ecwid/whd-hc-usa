//
//   AssetsLibrary.swift
//  WHDhackathon
//
//  Created by Rinat Gainullin on 5/25/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation


@objc(AssetsLibrary)
class AssetsLibrary: NSObject {
  @objc func convertBase64(path: String, callback: RCTResponseSenderBlock) -> Void {
    let url = NSURL(string: path);
    let assetsLibrary = ALAssetsLibrary();
    assetsLibrary.assetForURL(url, resultBlock: {(asset) -> Void in
        let representation = asset.defaultRepresentation();
        let image = representation.fullResolutionImage()
        let imageData = UIImageJPEGRepresentation(UIImage(CGImage: image.takeRetainedValue()), 0.3)
        callback([(imageData?.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.init(rawValue: 0)))!]);

      }, failureBlock: {(error) -> Void in })
    }
  
  @objc func sendData(url: String, data: String, callback: RCTResponseSenderBlock) -> Void {
    let req = NSMutableURLRequest(URL: NSURL(string: url)!);
    req.HTTPMethod = "POST"
    let d = NSData(base64EncodedString: data, options: NSDataBase64DecodingOptions(rawValue: 0))
//    let inputStream = NSInputStream(data: d!)
//    req.HTTPBodyStream = inputStream
    req.addValue(String(d!.length), forHTTPHeaderField: "Content-Length")
    let task = NSURLSession.sharedSession().uploadTaskWithRequest(req, fromData: d) {
      data,response,error in
        callback([String(response), String(error?.code)])
    }
    task.resume()
  }
  
  @objc func sendDataByUri(url: String, filePath: String, callback: RCTResponseSenderBlock) -> Void {
    let req = NSMutableURLRequest(URL: NSURL(string: url)!);
    req.HTTPMethod = "POST"
    let assetsLibrary = ALAssetsLibrary();
    assetsLibrary.assetForURL(NSURL(string: filePath), resultBlock: {(asset) -> Void in
      let representation = asset.defaultRepresentation();
      let image = representation.fullResolutionImage()
      let imageData = UIImageJPEGRepresentation(UIImage(CGImage: image.takeRetainedValue()), 1.0)
      req.addValue("image/jpeg", forHTTPHeaderField: "Content-Type")
      let task = NSURLSession.sharedSession().uploadTaskWithRequest(req, fromData:imageData) {
        data,response,error in
          callback([String(response), NSString(data:data!, encoding:NSUTF8StringEncoding)!])
      }
      task.resume()
    }, failureBlock: {(error) -> Void in })
    
    
  }
}


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
        let imageData = UIImageJPEGRepresentation(UIImage(CGImage: image.takeRetainedValue()), 1.0)
        callback([(imageData?.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength))!]);

      }, failureBlock: {(error) -> Void in })
      }
}


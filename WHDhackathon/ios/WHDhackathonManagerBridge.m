//
//  WHDhackathonManagerBridge.m
//  WHDhackathon
//
//  Created by Rinat Gainullin on 5/25/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(AssetsLibrary, NSObject)

RCT_EXTERN_METHOD(convertBase64: (NSString *)url callback: (RCTResponseSenderBlock) callback)
RCT_EXTERN_METHOD(sendData: (NSString *)url data: (NSString *)data callback: (RCTResponseSenderBlock) callback)
RCT_EXTERN_METHOD(sendDataByUri: (NSString *)url filePath: (NSString *)filePath callback: (RCTResponseSenderBlock) callback)

@end

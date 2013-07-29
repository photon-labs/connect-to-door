//
//  ctdProfileParser.h
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/11/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdProfileModel.h"

@interface ctdProfileParser : NSObject

-(ctdProfileModel*)parseResponse:(NSString*)response;

@end

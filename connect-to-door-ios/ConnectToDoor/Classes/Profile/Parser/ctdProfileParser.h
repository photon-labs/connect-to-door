//
//  ctdLoginParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdProfileModel.h"

@interface ctdProfileParser : NSObject

-(ctdProfileModel*)parseResponse:(NSString*)response;

@end

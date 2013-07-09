//
//  ctdLoginParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdReponseLoginModel.h"

@interface ctdLoginParser : NSObject

-(ctdReponseLoginModel*)parseResponse:(NSString*)response;

@end

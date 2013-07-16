//
//  ctdCheckInParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckInParser.h"
#import "JSONKit.h"
#import "ctdConstants.h"


@implementation ctdCheckInParser


/* aldi_p
 * this fucntion for paser string to object class
 * param String
 */
-(ctdResponseCheckInModel*)parseResponse:(NSString*)response{
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdResponseCheckInModel *model = [[ctdResponseCheckInModel alloc]initWithDefault];
    if([objResponse objectForKey:MESSAGE_KEY]){
        model.message =  [objResponse objectForKey:MESSAGE_KEY];
    }
    if([objResponse objectForKey:CHECK_IN_KEY]){
        model.checkIn =  [objResponse objectForKey:CHECK_IN_KEY];
    }
    if([objResponse objectForKey:STATUS_KEY]){
        model.status =  [objResponse objectForKey:STATUS_KEY];
    }

    return model;
}

@end

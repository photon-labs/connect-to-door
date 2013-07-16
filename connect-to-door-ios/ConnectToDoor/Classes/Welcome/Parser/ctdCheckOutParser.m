//
//  ctdCheckOutParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckOutParser.h"
#import "JSONKit.h"
#import "ctdConstants.h"

@implementation ctdCheckOutParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String
 */
-(ctdResponseCheckOutModel*)parseResponse:(NSString*)response{
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdResponseCheckOutModel *model = [[ctdResponseCheckOutModel alloc]initWithDefault];
    if([objResponse objectForKey:MESSAGE_KEY]){
        model.message =  [objResponse objectForKey:MESSAGE_KEY];
    }
    if([objResponse objectForKey:CHECK_OUT_KEY]){
        model.checkOut =  [objResponse objectForKey:CHECK_OUT_KEY];
    }
    if([objResponse objectForKey:STATUS_KEY]){
        model.status =  [objResponse objectForKey:STATUS_KEY];
    }
    
    return model;
}


@end

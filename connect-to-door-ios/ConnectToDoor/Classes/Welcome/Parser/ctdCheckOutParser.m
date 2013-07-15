//
//  ctdCheckOutParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckOutParser.h"
#import "JSONKit.h"


@implementation ctdCheckOutParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String
 */
-(ctdResponseCheckOutModel*)parseResponse:(NSString*)response{
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdResponseCheckOutModel *model = [[ctdResponseCheckOutModel alloc]initWithDefault];
    if([objResponse objectForKey:@"message"]){
        model.message =  [objResponse objectForKey:@"message"];
    }
    if([objResponse objectForKey:@"checkOut"]){
        model.checkOut =  [objResponse objectForKey:@"checkOut"];
    }
    if([objResponse objectForKey:@"status"]){
        model.status =  [objResponse objectForKey:@"status"];
    }
    
    return model;
}


@end

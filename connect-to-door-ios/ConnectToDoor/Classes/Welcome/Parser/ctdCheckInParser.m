//
//  ctdCheckInParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckInParser.h"
#import "JSONKit.h"


@implementation ctdCheckInParser


/* aldi_p
 * this fucntion for paser string to object class
 * param String
 */
-(ctdResponseCheckInModel*)parseResponse:(NSString*)response{
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdResponseCheckInModel *model = [[ctdResponseCheckInModel alloc]initWithDefault];
    if([objResponse objectForKey:@"message"]){
        model.message =  [objResponse objectForKey:@"message"];
    }
    if([objResponse objectForKey:@"checkIn"]){
        model.checkIn =  [objResponse objectForKey:@"checkIn"];
    }
    if([objResponse objectForKey:@"status"]){
        model.status =  [objResponse objectForKey:@"status"];
    }

    return model;
}

@end

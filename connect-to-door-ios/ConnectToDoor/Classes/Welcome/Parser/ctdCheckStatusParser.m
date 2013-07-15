//
//  ctdCheckStatusParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/15/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckStatusParser.h"
#import "JSONKit.h"

@implementation ctdCheckStatusParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String
 */
-(ctdResponseCheckStatusModel*)parseResponse:(NSString*)response{
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdResponseCheckStatusModel *model = [[ctdResponseCheckStatusModel alloc]initWithDefault];
    if([objResponse objectForKey:@"check_out"]){
        model.checkOut =  [objResponse objectForKey:@"check_out"];
    }
    if([objResponse objectForKey:@"check_in"]){
        model.checkIn =  [objResponse objectForKey:@"check_in"];
    }
    if([objResponse objectForKey:@"presence_id"]){
        model.presenceId =  [objResponse objectForKey:@"presence_id"];
    }
    if([objResponse objectForKey:@"employee_id"]){
        model.employeeId =  [objResponse objectForKey:@"employee_id"];
    }
    
    return model;
}


@end

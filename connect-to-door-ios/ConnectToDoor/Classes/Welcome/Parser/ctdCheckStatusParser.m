//
//  ctdCheckStatusParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/15/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckStatusParser.h"
#import "JSONKit.h"
#import "ctdConstants.h"

@implementation ctdCheckStatusParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String
 */
-(ctdResponseCheckStatusModel*)parseResponse:(NSString*)response{
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdResponseCheckStatusModel *model = [[ctdResponseCheckStatusModel alloc]initWithDefault];
    if([objResponse objectForKey:CHECK_OUT_STATUS_KEY]){
        model.checkOut =  [objResponse objectForKey:CHECK_OUT_STATUS_KEY];
    }
    if([objResponse objectForKey:CHECK_IN_STATUS_KEY]){
        model.checkIn =  [objResponse objectForKey:CHECK_IN_STATUS_KEY];
    }
    if([objResponse objectForKey:PRESENCE_ID_KEY]){
        model.presenceId =  [objResponse objectForKey:PRESENCE_ID_KEY];
    }
    if([objResponse objectForKey:EMPLOYEE_ID_KEY]){
        model.employeeId =  [objResponse objectForKey:EMPLOYEE_ID_KEY];
    }
    
    return model;
}


@end

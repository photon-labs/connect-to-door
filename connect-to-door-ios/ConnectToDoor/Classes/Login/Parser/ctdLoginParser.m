//
//  ctdLoginParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginParser.h"
#import "ctdConstants.h"
#import "JSONKit.h"


@implementation ctdLoginParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String 
 */
-(ctdReponseLoginModel*)parseResponse:(NSString*)response{
    
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdReponseLoginModel *model = [[ctdReponseLoginModel alloc]initWithDefault];
    if([objResponse objectForKey:MESSAGE_KEY]){
        model.message =  [objResponse objectForKey:MESSAGE_KEY];
    }
    if([objResponse objectForKey:USERNAME_PARAMETER]){
        model.username =  [objResponse objectForKey:USERNAME_PARAMETER];
    }
    if([objResponse objectForKey:STATUS_KEY]){
        model.status =  [objResponse objectForKey:STATUS_KEY];
    }
    if([objResponse objectForKey:ISADMIN_KEY]){
        model.previlage =  [objResponse objectForKey:ISADMIN_KEY];
    }
    
    return model;
}

@end

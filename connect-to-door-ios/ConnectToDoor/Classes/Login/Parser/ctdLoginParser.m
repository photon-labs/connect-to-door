//
//  ctdLoginParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginParser.h"
#import "JSONKit.h"


@implementation ctdLoginParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String 
 */
-(ctdReponseLoginModel*)parseResponse:(NSString*)response{
    
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdReponseLoginModel *model = [[ctdReponseLoginModel alloc]initWithDefault];
    if([objResponse objectForKey:@"message"]){
        model.message =  [objResponse objectForKey:@"message"];
    }
    if([objResponse objectForKey:@"username"]){
        model.username =  [objResponse objectForKey:@"username"];
    }
    if([objResponse objectForKey:@"status"]){
        model.status =  [objResponse objectForKey:@"status"];
    }
    if([objResponse objectForKey:@"isAdmin"]){
        model.previlage =  [objResponse objectForKey:@"isAdmin"];
    }
    
    return model;
}

@end

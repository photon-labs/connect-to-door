//
//  ctdLoginParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdProfileParser.h"
#import "ctdConstants.h"
#import "JSONKit.h"


@implementation ctdProfileParser

/* aldi_p
 * this fucntion for paser string to object class
 * param String 
 */
-(ctdProfileModel*)parseResponse:(NSString*)response{
    
    NSDictionary *objResponse = [response objectFromJSONString];
    ctdProfileModel *model = [[ctdProfileModel alloc]initWithDefault];
    if([objResponse objectForKey:EMPLOYEE_ID_PARAMETER]){
        model.employeeId =  [objResponse objectForKey:EMPLOYEE_ID_PARAMETER];
    }

    if([objResponse objectForKey:FACEBOOK_ID_KEY]){
        model.facebookId =  [objResponse objectForKey:FACEBOOK_ID_KEY];
    }
    
    if([objResponse objectForKey:EMAIL_PHOTON_KEY]){
        model.employeeEmailPhoton =  [objResponse objectForKey:EMAIL_PHOTON_KEY];
    }
    
    if([objResponse objectForKey:EMPLOYEE_NAME_KEY]){
        model.employeeName =  [objResponse objectForKey:EMPLOYEE_NAME_KEY];
    }
    
    if([objResponse objectForKey:START_WORK_KEY]){
        model.employeeStartWork =  [objResponse objectForKey:START_WORK_KEY];
    }
    
    if([objResponse objectForKey:SIGNATURE_KEY]){
        model.signature =  [objResponse objectForKey:SIGNATURE_KEY];
    }
    
    if([objResponse objectForKey:GENDER_KEY]){
        model.gender =  [objResponse objectForKey:GENDER_KEY];
    }
    
    if([objResponse objectForKey:STATUS_KEY]){
        model.status =  [objResponse objectForKey:STATUS_KEY];
    }
    
    if([objResponse objectForKey:AUTHORITY_KEY]){
        model.authority =  [objResponse objectForKey:AUTHORITY_KEY];
    }
    
    if([objResponse objectForKey:PROFILE_USERNAME_KEY]){
        model.userName =  [objResponse objectForKey:PROFILE_USERNAME_KEY];
    }
    
    if([objResponse objectForKey:PROJECT_ID_KEY]){
        model.projectId =  [objResponse objectForKey:PROJECT_ID_KEY];
    }
    
    if([objResponse objectForKey:MATERNITY_KEY]){
        model.maternity =  [objResponse objectForKey:MATERNITY_KEY];
    }
    
    if([objResponse objectForKey:PATERNITY_KEY]){
        model.paternity =  [objResponse objectForKey:PATERNITY_KEY];
    }
    
    if([objResponse objectForKey:SICK_KEY]){
        model.sick =  [objResponse objectForKey:SICK_KEY];
    }
    
    if([objResponse objectForKey:C_OFF_KEY]){
        model.cOff =  [objResponse objectForKey:C_OFF_KEY];
    }
    
    if([objResponse objectForKey:ANNUAL_KEY]){
        model.annual =  [objResponse objectForKey:ANNUAL_KEY];
    }
    
    if([objResponse objectForKey:MARRIED_KEY]){
        model.married =  [objResponse objectForKey:MARRIED_KEY];
    }
    
    if([objResponse objectForKey:CONDOLENCES_KEY]){
        model.condolences =  [objResponse objectForKey:CONDOLENCES_KEY];
    }
    
    if([objResponse objectForKey:ONSITE_KEY]){
        model.onsite =  [objResponse objectForKey:ONSITE_KEY];
    }

    
    return model;
}

@end

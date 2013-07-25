//
//  ctdDailyAttendanceService.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/24/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdDailyAttendanceService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"

@implementation ctdDailyAttendanceService

@synthesize delegate = _delegate;

-(void) requestDailyAttendanceToServer:(NSString*)employeeId date:(NSString*)date{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];
    
    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    NSDictionary *params = [NSDictionary dictionaryWithObjectsAndKeys:
                            employeeId, @"employee_id",
                            date, @"date",
                            nil];
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_DAILY_ATT parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Successful requestDailyAttendanceToServer, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveDailyAttendanceErrorResponse:)]) {
            [_delegate didReceiveDailyAttendanceErrorResponse:error];
        }
    }];

}

/**
 * aldi_p
 * this method for reponse success
 * @param String response
 */
-(void)didReceivedResponse:(NSString*)response{
    if(response != NULL || response.length > 0){
        if ([_delegate respondsToSelector:@selector(didReceivedDailyAttendanceResponse:)]) {
            [_delegate didReceivedDailyAttendanceResponse:response];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveDailyAttendanceErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveDailyAttendanceErrorResponse:error];
        }
    }

}

@end

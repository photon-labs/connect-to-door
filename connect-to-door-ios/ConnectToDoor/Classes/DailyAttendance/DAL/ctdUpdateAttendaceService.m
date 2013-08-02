//
//  ctdUpdateAttendaceService.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/30/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdUpdateAttendaceService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"

@implementation ctdUpdateAttendaceService

@synthesize delegate = _delegate;

-(void) requestUpdateAttendanceToServer:(NSString*)employeeId date:(NSString*)date checkInTime:(NSString*)checkInTime checkOutTime:(NSString*)checkOutTime presenceId:(NSString*)presenceId{

    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];
    
    
    
    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    NSDictionary *params = [NSDictionary dictionaryWithObjectsAndKeys:
                            employeeId, @"employee_id",
                            presenceId, @"presenceId",
                            checkInTime, @"checkIn",
                            checkOutTime, @"checkOut",
                            date, @"date",
                            nil];
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_UPDATE_CHECKIN_OUT parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Successful requestUpdateAttendanceToServer, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveDailyAttendanceErrorResponse:)]) {
            [_delegate didReceiveUpdateAttendanceErrorResponse:error];
        }
    }];
    
}

/**
 * @author:aldi_p
 * this method for reponse success
 * @param String response
 */
-(void)didReceivedResponse:(NSString*)response{
    if(response != NULL || response.length > 0){
        if ([_delegate respondsToSelector:@selector(didReceivedDailyAttendanceResponse:)]) {
            [_delegate didReceivedUpdateAttendanceResponse:response];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveDailyAttendanceErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveUpdateAttendanceErrorResponse:error];
        }
    }
    
}

@end

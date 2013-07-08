//
//  ctdCheckOutService.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckOutService.h"
#import "ctdConstants.h"
#import "AFHTTPClient.h"

@implementation ctdCheckOutService

@synthesize delegate = _delegate;

/**
 * aldi_p
 * this method for call API checkInAndCheckOut
 * @param String employeeId
 */
-(void)checkOutToServer:(NSString*)employeeId{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];
    
    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    NSDictionary *params = [NSDictionary dictionaryWithObjectsAndKeys:
                            employeeId, @"employee_id",
                            CHECKOUT, @"status",
                            nil];
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_CHECKOUT_CHECKIN parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Successful loginToServer, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
         //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveCheckOutErrorResponse:)]) {
            [_delegate didReceiveCheckOutErrorResponse:error];
        }
    }];
}

/**
 * aldi_p
 * this method for reponse success
 * @param String response
 */
-(void)didReceivedResponse:(NSString*)response{
    
}

@end

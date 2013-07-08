//
//  ctdLoginService.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"

@implementation ctdLoginService

@synthesize delegate = _delegate;

/**
 * aldi_p
 * this method for call API Login
 * @param String employeeId
 * @param String facebookId
 */
-(void) loginToServer:(NSString*)employeeId facebookID:(NSString*)facebookId{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];

    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    NSDictionary *params = [NSDictionary dictionaryWithObjectsAndKeys:
                            employeeId, @"employee_id",
                            facebookId, @"facebook_id",
                            nil];
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_LOGIN parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Successful loginToServer, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveLoginErrorResponse:)]) {
            [_delegate didReceiveLoginErrorResponse:error];
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

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
    if(response != NULL || response.length > 0){
        if ([_delegate respondsToSelector:@selector(didReceivedLoginResponse:)]) {
            [_delegate didReceivedLoginResponse:response];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveLoginErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveLoginErrorResponse:error];
        }
    }
}

@end

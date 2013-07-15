//
//  ctdLoginService.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdProfileService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"
#import "ctdProfileParser.h"

@implementation ctdProfileService

@synthesize delegate = _delegate;

/**
 * muhammad_a
 * this method for handle requests profile API
 * @param String searchParamater
 * @param String value
 */
-(void) handleProfileRequest :(NSString*)searchParameter :(NSString*)value{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];

    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    
    NSMutableDictionary *requestBody = [[NSMutableDictionary alloc] init];
    [requestBody setValue:value forKey:searchParameter];
    [requestBody setValue:searchParameter forKey:SEARCH_BY_PARAMTER];
    
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_PROFILE parameters:requestBody success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Profile Success, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveProfileErrorResponse:)]) {
            [_delegate didReceiveProfileErrorResponse:error];
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
        ctdProfileParser *parse = [[ctdProfileParser alloc]init];
        ctdProfileModel *model = [parse parseResponse:response];
        if ([_delegate respondsToSelector:@selector(didReceiveProfileResponse:)]) {
            [_delegate didReceiveProfileResponse:model];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveProfileErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveProfileErrorResponse:error];
        }
    }
}

@end

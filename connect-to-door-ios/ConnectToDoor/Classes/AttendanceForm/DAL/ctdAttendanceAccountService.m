//
//  ctdAttendanceAccountService.m
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/26/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import "ctdAttendanceAccountService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"
#import "ctdProfileParser.h"

@implementation ctdAttendanceAccountService

@synthesize delegate = _delegate;

/**
 * muhammad_a
 * this method for handle requests for CUD 
 * (create, update, delete) attendance account API
 * @param String searchParamater
 * @param String value
 */
-(void) handleAttendanceAccountCUDRequest :(NSDictionary*) requestBody {
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];

    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_CREATE_EDIT_DELETE_ACCOUNT parameters:requestBody success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Create/Edit/Delete Account Success, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveAttendanceAccountErrorResponse:)]) {
            [_delegate didReceiveAttendanceAccountErrorResponse:error];
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
        if ([_delegate respondsToSelector:@selector(didReceiveAttendanceAccountResponse:)]) {
            [_delegate didReceiveAttendanceAccountResponse:model];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveAttendanceAccountErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveAttendanceAccountErrorResponse:error];
        }
    }
}

@end

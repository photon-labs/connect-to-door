//
//  ctdCheckStatus.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/12/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCheckStatusService.h"
#import "ctdConstants.h"
#import "AFHTTPClient.h"

@implementation ctdCheckStatusService

@synthesize delegate = _delegate;


/**
 * aldi_p
 * this method for call API checkInAndCheckOut
 * @param String employeeId
 */
-(void)checkStatusToServer:(NSString*)employeeId{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];
    
    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    NSDictionary *params = [NSDictionary dictionaryWithObjectsAndKeys:
                            employeeId, @"employee_id",
                            CHECKSTATUS, @"status",
                            nil];
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_CHECKOUT_CHECKIN parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Successful check Statu server, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveCheckStatusErrorResponse:)]) {
            [_delegate didReceiveCheckStatusErrorResponse:error];
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
        if ([_delegate respondsToSelector:@selector(didReceivedCheckStatusResponse:)]) {
            [_delegate didReceivedCheckStatusResponse:response];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveCheckStatusErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveCheckStatusErrorResponse:error];
        }
    }

}

@end

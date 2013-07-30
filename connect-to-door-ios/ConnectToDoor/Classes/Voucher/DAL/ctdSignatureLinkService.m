//
//  ctdSignatureLinkService.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdSignatureLinkService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"

@implementation ctdSignatureLinkService

@synthesize delegate = _delegate;

-(void) requestSignatureLinkToServer:(NSString*)employeeId{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];
    
    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    NSDictionary *params = [NSDictionary dictionaryWithObjectsAndKeys:
                            employeeId, @"employee_id",
                            
                            nil];
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_SIGNATURE_LINK parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        NSLog(@"Request Successful requestSignatureLinkToServer, response '%@'", responseStr);
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveSignatureLinkErrorResponse:)]) {
            [_delegate didReceiveSignatureLinkErrorResponse:error];
        }
    }];
}

-(void)didReceivedResponse:(NSString*)response{
    if(response != NULL || response.length > 0){
        if ([_delegate respondsToSelector:@selector(didReceivedSignatureLinkResponse:)]) {
            [_delegate didReceivedSignatureLinkResponse:response];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveSignatureLinkErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveSignatureLinkErrorResponse:error];
        }
    }
}

@end

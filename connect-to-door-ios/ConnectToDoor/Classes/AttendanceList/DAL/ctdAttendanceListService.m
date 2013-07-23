//
//  ctdLoginService.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import "ctdAttendanceListService.h"
#import "AFHTTPClient.h"
#import "ctdConstants.h"
#import "ctdAttendanceListParser.h"
#import "ctdSummaryAttendanceModel.h"

@implementation ctdAttendanceListService

@synthesize delegate = _delegate;

/**
 * muhammad_a
 * this method for handle requests attendance list API
 * @param String searchParamater
 * @param String value
 */
-(void) handleAttendanceListRequest :(NSString*)searchParameter :(NSString*)value :(NSString*)dateStart :(NSString*)dateEnd{
    NSString* urlServer = URLSERVER;
    NSURL *url =[NSURL URLWithString:urlServer];

    AFHTTPClient *httpClient = [[AFHTTPClient alloc] initWithBaseURL:url];
    
    NSMutableDictionary *requestBody = [[NSMutableDictionary alloc] init];
    if((searchParameter != nil && ![searchParameter isEqualToString:@""]) || (value != nil && ![value isEqualToString:@""])){
        [requestBody setValue:value forKey:searchParameter];
    }
    [requestBody setValue:dateStart forKey:DATE_START_KEY];
    [requestBody setValue:dateEnd forKey:DATE_END_KEY];
    
    httpClient.parameterEncoding = AFJSONParameterEncoding;
    [httpClient postPath:MODULE_ATT_LIST parameters:requestBody success:^(AFHTTPRequestOperation *operation, id responseObject) {
        //this block function for response success and return velue
        NSString *responseStr = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        [self didReceivedResponse:responseStr];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //this block function for response error and return velue error
        NSLog(@"[HTTPClient Error]: %@", error.localizedDescription);
        if ([_delegate respondsToSelector:@selector(didReceiveProfileErrorResponse:)]) {
            [_delegate didReceiveAttendanceListErrorResponse:error];
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
        ctdAttendanceListParser *parse = [[ctdAttendanceListParser alloc]init];
        NSMutableArray *attendanceList = [parse parseResponseToArray:response];
        if ([_delegate respondsToSelector:@selector(didReceiveAttendanceListResponse:)]) {
            [_delegate didReceiveAttendanceListResponse:attendanceList];
        }
    }else{
        if ([_delegate respondsToSelector:@selector(didReceiveAttendanceListErrorResponse:)]) {
            NSMutableDictionary *errorDetail = [NSMutableDictionary dictionary];
            [errorDetail setValue:@"server error" forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"server error" code:412 userInfo:errorDetail];
            [_delegate didReceiveAttendanceListErrorResponse:error];
        }
    }
}

@end

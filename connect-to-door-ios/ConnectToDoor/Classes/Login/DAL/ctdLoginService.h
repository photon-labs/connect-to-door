//
//  ctdLoginService.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol LoginServiceDelegate <NSObject>
- (void)didReceivedLoginResponse:(NSString*)response;
- (void)didReceiveLoginErrorResponse:(NSError*)error;
@end

@interface ctdLoginService : NSObject{
    
}

@end

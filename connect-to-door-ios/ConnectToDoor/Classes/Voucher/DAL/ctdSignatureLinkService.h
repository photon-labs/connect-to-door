//
//  ctdSignatureLinkService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol SignatureLinkServiceDelegate <NSObject>
- (void)didReceivedSignatureLinkResponse:(NSString*)response;
- (void)didReceiveSignatureLinkErrorResponse:(NSError*)error;
@end

@interface ctdSignatureLinkService : NSObject{
    id<SignatureLinkServiceDelegate> _delegate;
}
@property (nonatomic,strong) id<SignatureLinkServiceDelegate>delegate;

-(void) requestSignatureLinkToServer:(NSString*)employeeId;
@end

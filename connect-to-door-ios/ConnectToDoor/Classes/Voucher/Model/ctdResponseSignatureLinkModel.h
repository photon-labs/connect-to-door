//
//  ctdResponseSignatureLinkModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdResponseSignatureLinkModel : NSObject

@property (nonatomic, strong) NSString *status;
@property (nonatomic, strong) NSString *signature;

- (ctdResponseSignatureLinkModel *)initWithDefault;
@end

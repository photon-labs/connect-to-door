//
//  ctdResponseCheckOutModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdResponseCheckOutModel : NSObject

@property (nonatomic, strong) NSString *message;
@property (nonatomic, strong) NSString *status;
@property (nonatomic, strong) NSString *checkOut;

- (ctdResponseCheckOutModel *)initWithDefault;

@end

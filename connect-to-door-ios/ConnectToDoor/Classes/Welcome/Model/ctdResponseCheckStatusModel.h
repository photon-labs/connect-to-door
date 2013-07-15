//
//  ctdResponseCheckStatusModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/15/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdResponseCheckStatusModel : NSObject
@property (nonatomic, strong) NSString *checkOut;
@property (nonatomic, strong) NSString *checkIn;
@property (nonatomic, strong) NSString *presenceId;
@property (nonatomic, strong) NSString *employeeId;


- (ctdResponseCheckStatusModel *)initWithDefault;

@end

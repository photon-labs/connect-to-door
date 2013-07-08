//
//  ctdResponseDailyAttendanceListModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdResponseDailyAttendanceListModel : NSObject

@property (nonatomic, strong) NSString *number;
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *checkIn;
@property (nonatomic, strong) NSString *checkOut;
@property (nonatomic, strong) NSString *previlage;
@property (nonatomic, strong) NSString *presentId;


- (ctdResponseDailyAttendanceListModel *)initWithDefault;

@end

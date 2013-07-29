//
//  ctdSummaryAttendanceModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdSummaryAttendanceModel : NSObject

@property (nonatomic, strong) NSString *employeeId;
@property (nonatomic, strong) NSString *employeeName;
@property (nonatomic, strong) NSString *projectId;
@property (nonatomic, strong) NSString *totalAttendance;
@property (nonatomic, strong) NSString *averageWorkingHour;
@property (nonatomic, strong) NSString *totalWorking;
@property (nonatomic, strong) NSString *totalLeave;

- (ctdSummaryAttendanceModel *)initWithDefault;

@end

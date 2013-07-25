//
//  ctdResponseDailyAttendanceModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdResponseDailyAttendanceModel : NSObject

@property (nonatomic, strong) NSMutableArray *arrayDailyAttendance;

- (ctdResponseDailyAttendanceModel *)initWithDefault;

-(NSMutableArray*)getDailyAttendanceListModels;
-(void)setDailyAttendanceListModels:(NSMutableArray*) arrayDailyAttendance;
@end

//
//  ctdResponseDailyAttendanceModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseDailyAttendanceModel.h"

@implementation ctdResponseDailyAttendanceModel

@synthesize arrayDailyAttendance = _arrayDailyAttendance;

-(ctdResponseDailyAttendanceModel *)initWithDefault{
    if(![_arrayDailyAttendance isKindOfClass:[NSNull class]]){
        [_arrayDailyAttendance removeAllObjects];
    }
    return self;
}

-(NSMutableArray*)getDailyAttendanceListModels{
    return _arrayDailyAttendance;
}

-(void)setDailyAttendanceListModels:(NSMutableArray*) arrayDailyAttendance{
    _arrayDailyAttendance = arrayDailyAttendance;
}


@end

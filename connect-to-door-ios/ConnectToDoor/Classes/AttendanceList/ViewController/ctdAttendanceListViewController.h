//
//  ctdAttendanceListViewController.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdBaseViewController.h"
#import "ctdAttendanceListService.h"

@interface ctdAttendanceListViewController : ctdBaseViewController <AttendanceListServiceDelegate>{
    IBOutlet UITableView *attendanceTableView;
    NSMutableArray *attendanceContentArray;
}

@end

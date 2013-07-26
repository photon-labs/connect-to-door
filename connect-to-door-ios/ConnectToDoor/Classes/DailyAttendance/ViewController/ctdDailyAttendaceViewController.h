//
//  ctdDailyAttendaceViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdBaseViewController.h"
#import "ctdDailyAttendanceService.h"
#import "ctdResponseDailyAttendanceModel.h"
#import "CKCalendarView.h"

@interface ctdDailyAttendaceViewController : ctdBaseViewController<UITableViewDataSource, UITableViewDelegate,DailyAttendanceServiceDelegate,CKCalendarDelegate>{
    
    IBOutlet UITableView *itemAttendacen;
    //IBOutlet UIView *dateView;
    IBOutlet UIButton *dateBtn;
    IBOutlet UITextField *dateTxt;
    NSString* dateString;
    ctdResponseDailyAttendanceModel *model;
    CKCalendarView *calendar;
    NSString *maxDate;
    NSString *datePickerActive;
    //NSDateFormatter *dateFormatter;
    IBOutlet UIButton *printButton;
}

- (IBAction)didDatePickerClicked:(id)sender;
- (IBAction)didPrintClicked:(id)sender;

@end

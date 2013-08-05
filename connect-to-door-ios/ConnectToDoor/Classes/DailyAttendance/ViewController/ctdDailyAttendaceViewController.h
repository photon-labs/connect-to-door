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
#import "ctdUpdateAttendaceService.h"

@interface ctdDailyAttendaceViewController : ctdBaseViewController<UITableViewDataSource, UITableViewDelegate,DailyAttendanceServiceDelegate,CKCalendarDelegate, UpdateAttendanceServiceDelegate, UITextFieldDelegate>{
    
    IBOutlet UITableView *itemAttendacen;
    //IBOutlet UIView *dateView;
    IBOutlet UIButton *dateBtn;
    IBOutlet UITextField *dateTxt;
    NSString* dateString;
    ctdResponseDailyAttendanceModel *model;
    NSString *maxDate;
    NSString *datePickerActive;
    //NSDateFormatter *dateFormatter;
    IBOutlet UIButton *printButton;
    
    ctdDailyAttendanceService *dailyAttendanceService;
    ctdUpdateAttendaceService *updateAttendanceService;
    
    NSIndexPath *indexPathClicked;
    BOOL isAdmin;
}

@property(nonatomic, strong) CKCalendarView *calendar;
@property(nonatomic, strong) NSDate *minimumDate;
@property(nonatomic, strong) NSDate *maximumDate;
@property(nonatomic, strong) NSArray *disabledDates;

- (IBAction)didDatePickerClicked:(id)sender;
- (IBAction)didPrintClicked:(id)sender;

@end

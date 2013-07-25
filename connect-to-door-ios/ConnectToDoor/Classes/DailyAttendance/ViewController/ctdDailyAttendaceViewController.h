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

@interface ctdDailyAttendaceViewController : ctdBaseViewController<UITableViewDataSource, UITableViewDelegate,DailyAttendanceServiceDelegate>{
    IBOutlet UITableView *itemAttendacen;
    IBOutlet UIView *dateView;
    IBOutlet UIButton *dateBtn;
    IBOutlet UIBarButtonItem *saveBtnDatePicker;
    IBOutlet UIBarButtonItem *cancelBtnDatePicker;
    IBOutlet UIDatePicker *datePicker;
    IBOutlet UITextField *dateTxt;
    IBOutlet UIToolbar *toolbarDatePicker;
    NSString* dateString;
    ctdResponseDailyAttendanceModel *model;
}

- (IBAction)didDatePickerClicked:(id)sender;
- (IBAction)didDatePickerSaveBtnTypeClicked:(id)sender;
- (IBAction)didDatePickerCancelBtnTypeClicked:(id)sender;
@end

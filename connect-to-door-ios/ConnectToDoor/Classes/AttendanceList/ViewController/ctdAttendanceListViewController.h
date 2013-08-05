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
#import "DropDownView.h"
#import "CKCalendarView.h"

@interface ctdAttendanceListViewController : ctdBaseViewController <AttendanceListServiceDelegate, DropDownViewDelegate, CKCalendarDelegate> {
    
	DropDownView *dropDownView;
    CKCalendarView *calendar;
    ctdAttendanceListService *attendanceListService;
    
	IBOutlet UITableView *attendanceTableView;
    
    NSMutableArray *attendanceContentArray;
	NSMutableArray *optionData;
    NSMutableDictionary *searcOptionMap;
    NSDateFormatter *dateFormatter;
    NSString *maxDate;
    NSString *datePickerActive;
    NSString *searchOptionKey;
}

@property (nonatomic, strong) IBOutlet UITextField *dateStartText;
@property (nonatomic, strong) IBOutlet UITextField *dateEndText;
@property (nonatomic, strong) IBOutlet UITextField *searchKeyText;
@property (nonatomic, strong) IBOutlet UIButton *searchOptionButton;
@property (nonatomic, strong) IBOutlet UIButton *dateStartButton;
@property (nonatomic, strong) IBOutlet UIButton *dateEndButton;
@property (nonatomic, strong) IBOutlet UIButton *searchButton;
@property (nonatomic, strong) IBOutlet UIButton *searchOptionTextButton;
@property (nonatomic, strong) IBOutlet UIButton *printButton;
@property(nonatomic, strong) CKCalendarView *calendar;
@property(nonatomic, strong) NSDate *minimumDate;
@property(nonatomic, strong) NSDate *maximumDate;
@property(nonatomic, strong) NSArray *disabledDates;

- (IBAction)didDateStartClicked:(id)sender;
- (IBAction)didDateEndClicked:(id)sender;
- (IBAction)didSearchOptionClicked:(id)sender;
- (IBAction)didSearchClicked:(id)sender;
- (IBAction)didPrintClicked:(id)sender;


@end

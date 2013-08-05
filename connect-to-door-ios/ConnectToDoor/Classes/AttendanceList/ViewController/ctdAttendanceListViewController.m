//
//  ctdAttendanceListViewController.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import "ctdAttendanceListViewController.h"
#import "ctdConstants.h"
#import "ctdAttendanceTableViewCell.h"
#import "ctdColorUtilities.h"
#import "ctdSummaryAttendanceModel.h"

@implementation ctdAttendanceListViewController

@synthesize searchOptionTextButton;
@synthesize dateStartText;
@synthesize dateEndText;
@synthesize searchKeyText;
@synthesize printButton;
@synthesize searchButton;
@synthesize calendar;
@synthesize maximumDate;
@synthesize minimumDate;
@synthesize disabledDates;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    printButton.alpha = 0.0;
    attendanceListService = [[ctdAttendanceListService alloc] init];
    attendanceListService.delegate = self;
    
    dateFormatter=[[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd/MM/yyyy"];
    maxDate = [dateFormatter stringFromDate:[NSDate date]];
    datePickerActive = @"";
    
    optionData = [[NSMutableArray alloc] initWithArray:[NSMutableArray arrayWithObjects:DATE_STRING,NAME_STRING,PROJECT_ID_STRING,EMPLOYEE_ID_STRING, nil]];
	dropDownView = [[DropDownView alloc] initWithArrayData:optionData cellHeight:30 heightTableView:130 paddingTop:-5 paddingLeft:-3 paddingRight:-10 refView:searchOptionTextButton animation:BOTH openAnimationDuration:0 closeAnimationDuration:0];
	dropDownView.delegate = self;
	[self.view addSubview:dropDownView.view];
	
	[searchOptionTextButton setTitle:[optionData objectAtIndex:0] forState:UIControlStateNormal];
    [searchKeyText setHidden:TRUE];
    [searchKeyText setText:@""];
    
    searcOptionMap = [[NSMutableDictionary alloc] init];
    [searcOptionMap setObject:DATE_KEY forKey:DATE_STRING];
    [searcOptionMap setObject:PROFILE_USERNAME_KEY forKey:NAME_STRING];
    [searcOptionMap setObject:PROJECT_ID_KEY forKey:PROJECT_ID_STRING];
    [searcOptionMap setObject:EMPLOYEE_ID_KEY forKey:EMPLOYEE_ID_STRING];
}

- (void)setShowButton{
    NSString *previllage = [[NSUserDefaults standardUserDefaults] objectForKey:@"previllage"];
    NSLog(@"previllage ===== %@", previllage);
    
    BOOL isAdmin = [previllage isEqualToString:@"Admin"] ? YES: NO;
    if(isAdmin){
        printButton.alpha = 1.0;
    }else{
        printButton.alpha = 0.0;
    }
}

-(void)didReceiveAttendanceListResponse:(NSMutableArray *)attendanceListArray
{
    [self hideActivityIndicator];
    attendanceContentArray = attendanceListArray;
    [attendanceTableView reloadData];
    
    if([attendanceContentArray count] > 0){
        [self setShowButton];
    }
    
}

- (void)didReceiveAttendanceListErrorResponse:(NSError*)error;
{
    [self hideActivityIndicator];
    NSLog(@"ERROR RESPONSE : %@", error);
}

#pragma mark UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;    //count of section
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    return [attendanceContentArray count];    //count number of row from counting array hear cataGorry is An Array
}

- (UITableViewCell *)tableView:(UITableView *)tableView
         cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *MyIdentifier = [NSString stringWithFormat:@"MyIdentifier %i", indexPath.row];
    
    ctdAttendanceTableViewCell *cell = (ctdAttendanceTableViewCell *)[attendanceTableView dequeueReusableCellWithIdentifier:MyIdentifier];
    
    if (cell == nil) {
        NSArray *topLevelObjects = [[NSBundle mainBundle] loadNibNamed:@"ctdAttendanceTableViewCell" owner:self options:nil];
        cell = [topLevelObjects objectAtIndex:0];
    }
    
    if( [indexPath row] % 2 == 0){
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"FFFFFF"]];
    }else{
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"cfe9d0"]];
    }
    
    ctdSummaryAttendanceModel *data = [attendanceContentArray objectAtIndex:indexPath.row];
    
    UILabel *numberLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 0, 33.0,tableView.rowHeight)];
    [cell addColumn:50];
    numberLabel.font = [UIFont systemFontOfSize:12.0];
    numberLabel.text = [NSString stringWithFormat:@"%d.", indexPath.row + 1];
    numberLabel.textColor = [UIColor blackColor];
    numberLabel.textAlignment = NSTextAlignmentCenter;
    numberLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:numberLabel];
    
    UIImageView *separator = [[UIImageView alloc] initWithFrame:CGRectMake(34.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:60];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *nameLabel =  [[UILabel alloc] initWithFrame:CGRectMake(38, 0, 146.0,tableView.rowHeight)];
    [cell addColumn:70];
    nameLabel.font = [UIFont systemFontOfSize:12.0];
    nameLabel.text = data.employeeName;
    nameLabel.textColor = [UIColor blackColor];
    nameLabel.textAlignment = NSTextAlignmentLeft;
    nameLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:nameLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(181.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:80];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *employeeIdLabel =  [[UILabel alloc] initWithFrame:CGRectMake(185.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:90];
    employeeIdLabel.font = [UIFont systemFontOfSize:12.0];
    employeeIdLabel.text = data.employeeId;
    employeeIdLabel.textColor = [UIColor blackColor];
    employeeIdLabel.textAlignment = NSTextAlignmentCenter;
    employeeIdLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:employeeIdLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(272.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:100];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *projectIdLabel =  [[UILabel alloc] initWithFrame:CGRectMake(274.0, 0, 88.0,tableView.rowHeight)];
    [cell addColumn:110];
    //  label.tag = VALUE_TAG;
    projectIdLabel.font = [UIFont systemFontOfSize:12.0];
    // add some silly value
    projectIdLabel.text = data.projectId;
    projectIdLabel.textColor = [UIColor blackColor];
    projectIdLabel.textAlignment = NSTextAlignmentCenter;
    projectIdLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:projectIdLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(362.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:120];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *totalAttendanceLabel =  [[UILabel alloc] initWithFrame:CGRectMake(365.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:130];
    totalAttendanceLabel.font = [UIFont systemFontOfSize:12.0];
    totalAttendanceLabel.text = data.totalAttendance;
    totalAttendanceLabel.textColor = [UIColor blackColor];
    totalAttendanceLabel.textAlignment = NSTextAlignmentCenter;
    totalAttendanceLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalAttendanceLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(452.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:140];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *totalWorkingLabel =  [[UILabel alloc] initWithFrame:CGRectMake(454.0, 0, 88.0,tableView.rowHeight)];
    [cell addColumn:150];
    totalWorkingLabel.font = [UIFont systemFontOfSize:12.0];
    totalWorkingLabel.text = data.totalWorking;
    totalWorkingLabel.textColor = [UIColor blackColor];
    totalWorkingLabel.textAlignment = NSTextAlignmentCenter;
    totalWorkingLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalWorkingLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(543.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:160];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *totalLeaveLabel =  [[UILabel alloc] initWithFrame:CGRectMake(546.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:170];
    totalLeaveLabel.font = [UIFont systemFontOfSize:12.0];
    totalLeaveLabel.text = data.totalLeave;
    totalLeaveLabel.textColor = [UIColor blackColor];
    totalLeaveLabel.textAlignment = NSTextAlignmentCenter;
    totalLeaveLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalLeaveLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(633.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:180];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *averageWorkingLabel =  [[UILabel alloc] initWithFrame:CGRectMake(635.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:190];
    averageWorkingLabel.font = [UIFont systemFontOfSize:12.0];
    averageWorkingLabel.text = data.averageWorkingHour;
    averageWorkingLabel.textColor = [UIColor blackColor];
    averageWorkingLabel.textAlignment = NSTextAlignmentCenter;
    averageWorkingLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:averageWorkingLabel];
    
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    return cell;
}



- (IBAction)didDateStartClicked:(id)sender
{
    datePickerActive = DATE_START;
    CGFloat dateStartX = CGRectGetMaxX(self.dateStartButton.frame);
    CGFloat dateStartY = CGRectGetMaxY(self.dateStartButton.frame);
    [self createPopUpCalendarWithValidation:dateStartX :dateStartY];
}

- (IBAction)didDateEndClicked:(id)sender
{
    datePickerActive = DATE_END;
    CGFloat dateEndX = CGRectGetMaxX(self.dateEndButton.frame);
    CGFloat dateEndY = CGRectGetMaxY(self.dateEndButton.frame);
    [self createPopUpCalendarWithValidation:dateEndX :dateEndY];
}

- (IBAction)didSearchOptionClicked:(id)sender
{
    [self removePopUp];
    if(dropDownView.view.isHidden){
        [dropDownView openAnimation];
    }else{
        [dropDownView closeAnimation];
    }
    
    
}

- (IBAction)didSearchClicked:(id)sender
{
    NSString *dateStart = self.dateStartText.text;
    NSString *dateEnd = self.dateEndText.text;
    if(dateStart.length > 0 || dateEnd.length > 0 ){
        [self showActivityIndicator];
        [attendanceListService handleAttendanceListRequest:searchOptionKey :searchKeyText.text :dateStart :dateEnd];
    }else{
        [self showAlert:kAlertErrorEmptyDate];
    }
}

- (void) createPopUpCalendar :(CGFloat)positionX :(CGFloat)positionY
{
    calendar = [[CKCalendarView alloc] initWithStartDay:startMonday];
    calendar.delegate = self;
    
    calendar.onlyShowCurrentMonth = NO;
    calendar.adaptHeightToNumberOfWeeksInMonth = YES;
    
    calendar.frame = CGRectMake(positionX, positionY, 300, 320);
}

- (void) createPopUpCalendarWithValidation :(CGFloat)positionX :(CGFloat)positionY
{
    [dropDownView closeAnimation];
    if([calendar isDescendantOfView:self.view]){
        [self removePopUp];
    } else {
        attendanceTableView.userInteractionEnabled = NO;
        [self createPopUpCalendar:positionX :positionY];
        [self.view addSubview:calendar];
    }
}

- (void) removePopUp
{
    attendanceTableView.userInteractionEnabled = YES;
    datePickerActive = @"";
    calendar.delegate = nil;
    [calendar removeFromSuperview];
    calendar = nil;
}


- (BOOL)dateIsDisabled:(NSDate *)date {
    for (NSDate *disabledDate in self.disabledDates) {
        if ([disabledDate isEqualToDate:date]) {
            return YES;
        }
    }
    return NO;
}

#pragma mark - CKCalendarDelegate

- (void)calendar:(CKCalendarView *)calendar configureDateItem:(CKDateItem *)dateItem forDate:(NSDate *)date {
    // TODO: play with the coloring if we want to...
    if ([self dateIsDisabled:date]) {
        dateItem.backgroundColor = [UIColor redColor];
        dateItem.textColor = [UIColor whiteColor];
    }
}

- (BOOL)calendar:(CKCalendarView *)calendar willSelectDate:(NSDate *)date {
    return [self.calendar dateIsInCurrentMonth:date];
}

- (void)calendar:(CKCalendarView *)calendar didSelectDate:(NSDate *)date
{
    if([datePickerActive isEqualToString:DATE_START]) {
        self.dateStartText.text = [dateFormatter stringFromDate:date];
    } else if([datePickerActive isEqualToString:DATE_END]) {
        self.dateEndText.text = [dateFormatter stringFromDate:date];
    }
    [self removePopUp];
}

- (BOOL)calendar:(CKCalendarView *)calendar willChangeToMonth:(NSDate *)date {
    return YES;
}

- (void)calendar:(CKCalendarView *)calendar didLayoutInRect:(CGRect)frame {
    NSLog(@"calendar layout: %@", NSStringFromCGRect(frame));
}

#pragma mark - Dropdown View Delegate
-(void)dropDownCellSelected:(NSInteger)returnIndex{
    NSString *searchOption = [optionData objectAtIndex:returnIndex];
    [searchKeyText setText:@""];
    searchOptionKey = [searcOptionMap valueForKey:searchOption];
    if(![searchOptionKey isEqualToString:DATE_KEY]){
        [searchKeyText setHidden:FALSE];
        [self moveDownPosition];
    } else {
        [searchKeyText setHidden:TRUE];
        [self moveUpPosition];
    }
    [searchOptionTextButton setTitle:searchOption forState:UIControlStateNormal];
}

- (void)moveDownPosition{
    [UIView animateWithDuration:0.5 animations:^{
        
        CGRect frame;
        
        // let's move our textField too
        frame=searchButton.frame;
        frame.origin.y=searchKeyText.frame.origin.y + searchKeyText.frame.size.height + 17;
        searchButton.frame=frame;
        
    }];
}

- (void)moveUpPosition{
    [UIView animateWithDuration:0.5 animations:^{
        
        CGRect frame;
        
        // let's move our textField too
        frame=searchButton.frame;
        frame.origin.y= searchOptionTextButton.frame.origin.y + searchOptionTextButton.frame.size.height + 17;
        searchButton.frame=frame;
        
    }];
}

// Close popup if the Background is touched
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
	[super touchesBegan:touches withEvent:event];
    NSLog(@"enter touchesBegan");
    UITouch *touch = [[event allTouches] anyObject];
	if ([touch view] != calendar) {
        [self removePopUp];
    }
    if ([touch view] != dropDownView.view) {
        [dropDownView closeAnimation];
    }
    
    [searchKeyText resignFirstResponder];
    
}

- (IBAction)didPrintClicked:(id)sender{
    [self showAlert:kAlertUnderConstruction];
}

@end
